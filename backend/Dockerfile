FROM python:3.9

# Set the working directory to the root
WORKDIR /code

# Copy the requirements file to the root directory
COPY ./requirements.txt /code/requirements.txt

# Install the Python dependencies
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Manually install the en_core_web_sm spaCy model
RUN python -m spacy download en_core_web_sm

# Copy all application files from the root to the code directory
COPY . /code

ENV PORT 8080

# Specify the command to run your application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]

