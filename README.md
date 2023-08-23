# Form Builder Module

The Form Builder Module is a versatile tool designed to empower users to create customized forms effortlessly. Through a drag-and-drop interface, users can compose forms by adding components such as
text boxes, date pickers, and various data input types. These dynamic forms can be saved in the system and utilized later within workflows through an integrated workflow module. 
The development involves Angular TypeScript for the frontend, C# for backend logic, and APIs for seamless communication, with data storage managed by MySQL.

## Key Features
- **Drag-and-Drop Interface**: Users can easily create forms by dragging and dropping components onto a canvas.
- **Custom Components**: The builder supports diverse components, including text boxes, date pickers, and other data input types.
- **Dynamic Configuration**: Users can define component properties like labels, validation rules, and default values.
- **Form Persistence**: Created forms are saved in the MySQL database for future use.
- **Workflow Integration**: Forms can be utilized within the integrated workflow module to enable data-driven processes.

## Installation
1. Clone this repository to your local machine:
git clone https://github.com/aliyoussef11/formbuild.git

2. Navigate to the project directory:
cd form-builder

3. Install the required frontend dependencies:
npm install

4. Set up the backend environment with C# and APIs as per documentation.
5. Create a MySQL database and configure the connection settings in the application.
6. Build and run the Angular app:
ng serve

7. Start the backend server.
8. Access the application by visiting `http://localhost:4200` in your web browser.

## Usage
1. Launch the Form Builder application in your browser.
2. Drag and drop various components onto the canvas to create your desired form structure.
3. Configure each component's properties, such as labels, validation rules, and default values.
4. Save the created form to the MySQL database.
5. In the Workflow Module, incorporate the saved forms into your workflows as needed.

## Technologies Used
- Angular TypeScript: The frontend framework used to build the dynamic user interface.
- C#: The backend logic for handling form configuration, validation, and storage.
- APIs: Facilitate communication between the frontend and backend components.
- MySQL: The relational database used to store the form configurations.

## License
This project is licensed under the [MIT License](LICENSE).
