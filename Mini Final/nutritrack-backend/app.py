from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import json

app = Flask(__name__)
CORS(app)

# =========================================
# Lazy Load YOLO Model
# =========================================
model = None

def load_model():
    global model

    if model is None:
        from ultralytics import YOLO

        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(BASE_DIR, "best.pt")

        print(f"Loading model from: {model_path}")

        model = YOLO(model_path)

    return model

# =========================================
# Base Directory
# =========================================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# =========================================
# Upload Folder
# =========================================
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'static', 'uploads')

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# =========================================
# Allowed Extensions
# =========================================
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# =========================================
# Load Nutrient Database
# =========================================
nutrient_file = os.path.join(BASE_DIR, 'data', 'nutrient_database.json')

with open(nutrient_file, 'r') as f:
    nutrient_data = json.load(f)

# =========================================
# Helper Functions
# =========================================
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def clean_calories_value(calories_value):
    if isinstance(calories_value, str):
        calories_value = calories_value.lower().replace('kcal', '').strip()

    try:
        return float(calories_value)

    except:
        return 0

# =========================================
# Routes
# =========================================
@app.route('/')
def home():
    return jsonify({
        "message": "NutriTrack API Running Successfully 🚀"
    })

# =========================================
# Upload Route
# =========================================
@app.route('/upload', methods=['POST'])
def upload_file():

    if 'file' not in request.files:
        return jsonify({
            'error': 'No file part'
        }), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({
            'error': 'No selected file'
        }), 400

    if not allowed_file(file.filename):
        return jsonify({
            'error': 'Invalid file type'
        }), 400

    filename = secure_filename(file.filename)

    filepath = os.path.join(
        app.config['UPLOAD_FOLDER'],
        filename
    )

    file.save(filepath)

    try:
        # =========================================
        # Load YOLO Model
        # =========================================
        model = load_model()

        # =========================================
        # Run Prediction
        # =========================================
        results = model(filepath)

        image_result = results[0]

        names = model.names

        food_counts = {}
        nutrients = {}
        detected_foods = []
        detected_foods_text = []

        # =========================================
        # Detect Foods
        # =========================================
        if image_result.boxes:

            for i in range(len(image_result.boxes.cls)):

                class_id = int(
                    image_result.boxes.cls[i].item()
                )

                detected_food = names[class_id]

                food_counts[detected_food] = \
                    food_counts.get(detected_food, 0) + 1

            # =========================================
            # Nutrient Processing
            # =========================================
            for food, count in food_counts.items():

                detected_foods.append({
                    'name': food,
                    'count': count
                })

                detected_foods_text.append(
                    f"{count} {food.capitalize()} detected"
                )

                nutrient_info = nutrient_data.get(food, {})

                nutrients[food] = nutrient_info

            # =========================================
            # Total Calories
            # =========================================
            total_calories = sum(
                clean_calories_value(
                    nutrients[food].get('calories', 0)
                ) * count
                for food, count in food_counts.items()
            )

        else:
            detected_foods = []
            detected_foods_text = ["No food detected"]
            total_calories = 0

        # =========================================
        # Save Processed Image
        # =========================================
        processed_filename = 'processed_' + filename

        processed_path = os.path.join(
            app.config['UPLOAD_FOLDER'],
            processed_filename
        )

        image_result.save(filename=processed_path)

        # =========================================
        # Return Response
        # =========================================
        return jsonify({
            'filename': processed_filename,
            'foods': detected_foods,
            'foods_text': detected_foods_text,
            'nutrients': nutrients,
            'total_calories': total_calories
        })

    except Exception as e:

        print("ERROR:", str(e))

        return jsonify({
            'error': str(e)
        }), 500

# =========================================
# Render Deployment Fix
# =========================================
if __name__ == '__main__':

    port = int(os.environ.get("PORT", 10000))

    app.run(
        host='0.0.0.0',
        port=port,
        debug=False
    )