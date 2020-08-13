# Angular digit recognition web app

This is my implementation of a digit recognition application in angular. You can try it out on this link: https://andrewbarzu.github.io/angular-digit-recognition/

## Implementation details

The application uses a table as a canvas to draw the digits. After and image is drawn and the "Predict" button is pressed, the image is sent to a heroku api written in python with flask, to be processed by a neural network and to return the prediction. The said api is also on github, on this page: https://github.com/AndrewBarzu/PythonBackendDigitRecognition

## Backend Neural Network

The Neural Network is a Fully Connected Neural Network, and because of that it has a pretty bad accuracy on new examples of digits, I'd rate it a 60 or 70% on a good day. I may try using a canvas and compressing the image to get higher variance in the sent image, rather than an image with either black or white, but for that i'll need to figure out a way to send large data over to api's and a way to use the html canvas in typescript.
