from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import json
from ultralytics import YOLO

app = Flask(__name__)
CORS(app)

# Load the YOLO model
model = YOLO('best.pt')

# Configure upload folder
UPLOAD_FOLDER = os.path.join('static', 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Allowed file extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# Load nutrient data from JSON file
with open('data/nutrient_database.json', 'r') as f:
    nutrient_data = json.load(f)

# Helper functions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def clean_calories_value(calories_value):
    if isinstance(calories_value, str):
        calories_value = calories_value.lower().replace('kcal', '').strip()
    try:
        return float(calories_value)
    except ValueError:
        return 0

@app.route('/')
def index():
    return jsonify({"message": "Welcome to the Food Detection API. Use the /upload endpoint to upload images."})

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': "No selected file"}), 400

    if not allowed_file(file.filename):
        return jsonify({'error': "Invalid file type"}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    try:
        results = model(filepath)
        image_result = results[0]
        names = model.names

        food_counts = {}
        nutrients = {}
        detected_foods = []
        detected_foods_text = []

        if image_result.boxes:
            for i in range(len(image_result.boxes.cls)):
                class_id = int(image_result.boxes.cls[i].item())
                detected_food = names[class_id]
                food_counts[detected_food] = food_counts.get(detected_food, 0) + 1

            for food, count in food_counts.items():
                detected_foods.append({
                    'name': food,
                    'count': count
                })
                detected_foods_text.append(f"{count} {food.capitalize()} detected")
                nutrient_info = nutrient_data.get(food, {})
                nutrients[food] = nutrient_info
                print(f"Detected food: {food}, Nutrients: {nutrient_info}")

            total_calories = sum(
                clean_calories_value(nutrients[food].get('calories', 0)) * count
                for food, count in food_counts.items()
            )
        else:
            detected_foods = []
            detected_foods_text = ["No food detected"]
            total_calories = 0

        processed_filename = 'processed_' + filename
        processed_path = os.path.join(app.config['UPLOAD_FOLDER'], processed_filename)
        image_result.save(filename=processed_path)

        return jsonify({
            'filename': processed_filename,
            'foods': detected_foods,            # structured
            'foods_text': detected_foods_text,  # readable
            'nutrients': nutrients,
            'total_calories': total_calories
        })

    except Exception as e:
        return jsonify({'error': f"Error during image processing: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
