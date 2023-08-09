# TODO

1. Front-end Technologies:
   For the front-end, you can use HTML, CSS, and JavaScript. You may also want to consider using a front-end framework like React, Angular, or Vue.js for a more structured and interactive user interface.

2. Backend Technologies:
   For the backend, you can use a server-side language such as Node.js with a framework like Express.js. This will handle user requests, image processing, and generation of collage images.

3. Image Manipulation:
   To manipulate images and create collages, you can use a JavaScript library like fabric.js, Konva.js, or CamanJS. These libraries offer functionalities to handle image placement, rotation, scaling, and more.

4. Uploading Images:
   Allow users to upload their images for the collage creation. For this, you can use HTML's input type="file" element along with some JavaScript to handle the image uploads.

5. Collage Generation:
   Implement the logic to generate different arrangements of the photos. You can use various algorithms, like permutations or random placement, to create different collage layouts.

6. User Interaction:
   Implement the interface to allow users to shuffle through different collage arrangements, zoom in/out, and rotate images within the collage.

7. Exporting Collage:
   Offer users the option to download the collage as a PNG image. You can achieve this by converting the collage canvas to a data URL and providing a download link to the user.

8. Transparent Background (Optional):
   If you want to allow the option of a transparent background, you can implement a checkbox or a toggle to enable/disable transparency. Then, during the collage generation, you would need to handle transparency accordingly.

9. Deployment:
   Once you've completed the development, you'll need to deploy your web app to a hosting service. Popular options include Heroku, Netlify, or Vercel.

## Running

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Structure

├── App.js
├── FolderA
│ ├── ItemA1.js
│ ├── ItemA2.js
│ ├── ItemA3.js
│ ├── ItemA4.js
│ └── ItemA5.js
├── FolderB
│ ├── ItemB1.js
│ ├── ItemB2.js
│ ├── ItemB3.js
│ ├── ItemB4.js
│ └── ItemB5.js
├── Item1.js
├── Item2.js
├── Item3.js
├── Item4.js
└── Item5.js

App.js -> ├── Header.js
├── MenuBar.js
├── CollageEditor.js
├── MainUploader.js

## Features

- Upload unlimited files in a collage
- Edit resolution
- Different layout modes
