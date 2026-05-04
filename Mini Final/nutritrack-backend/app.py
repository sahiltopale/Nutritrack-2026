from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import json

app = Flask(__name__)
CORS(app)

# ---------------------------
# Lazy load YOLO model (IMPORTANT)
# ---------------------------
model = None

def load_model():
    global model
    if model is None:
        from ultralytics import YOLO
        model = YOLO('best.pt')
    return model

# ---------------------------
# Config
# ---------------------------
UPLOAD_FOLDER = os.path.join('static', 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# ---------------------------
# Load nutrient data
# ---------------------------
with open('data/nutrient_database.json', 'r') as f:
    nutrient_data = json.load(f)

# ---------------------------
# Helpers
# ---------------------------
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def clean_calories_value(calories_value):
    if isinstance(calories_value, str):
        calories_value = calories_value.lower().replace('kcal', '').strip()
    try:
        return float(calories_value)
    except:
        return 0

# ---------------------------
# Routes
# ---------------------------
@app.route('/')
def index():
    return jsonify({"message": "API Running 🚀"})

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
        model = load_model()  # load only when needed

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
            'foods': detected_foods,
            'foods_text': detected_foods_text,
            'nutrients': nutrients,
            'total_calories': total_calories
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ---------------------------
# IMPORTANT: Render Port Fix
# ---------------------------
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)