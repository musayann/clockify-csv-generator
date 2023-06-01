# Clockify CSV Generator

Clockify CSV Generator is a Next.js project that allows users to convert Toggl and awork CSV files into a Clockify-compatible CSV format. The generated CSV file can be manually uploaded to Clockify for importing time entries. Clockify is a popular time tracking tool used by individuals and teams to monitor their work hours.

This project provides a user-friendly interface where users can upload their Toggl or awork CSV files. The application will parse the data and convert it into the required format for Clockify. The generated CSV file can then be downloaded and imported into Clockify, enabling a seamless transfer of time entries between different time tracking platforms.

## Live URL

You can access the live version of Clockify CSV Generator at [https://clockify-csv.netlify.app](https://clockify-csv.netlify.app/).

## Features

- Convert Toggl and awork CSV files into Clockify-compatible CSV format.
- Upload and parse CSV files with time entry data.
- Generate a CSV file with the converted data in the correct format for Clockify.
- Provide an intuitive user interface for file upload and conversion.
- Facilitate smooth migration of time entries from Toggl or awork to Clockify.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/musayann/clockify-csv-generator.git
   ```

2. Navigate to the project directory:

   ```bash
   cd clockify-csv-generator
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the Clockify CSV Generator.

## Dependencies

Clockify CSV Generator relies on the following main dependencies:

- Next.js: A React framework for server-side rendering and static site generation.
- React: A JavaScript library for building user interfaces.
- Tailwind CSS: A utility-first CSS framework for rapid UI development.
- Moment.js: A JavaScript library for parsing, validating, manipulating, and formatting dates.
- formidable: A Node.js module for parsing form data, especially file uploads.
- csvtojson: A CSV parsing and conversion library for Node.js.
- json-2-csv: A library for converting JSON to CSV format.

Please refer to the `package.json` file for a complete list of dependencies.

## Contributing

Contributions to the Clockify CSV Generator project are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request on the project's GitHub repository.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it as per the terms of the license.

## Acknowledgments

Clockify CSV Generator was developed by [@musyann](https://github.com/musayann) as a personal project to facilitate the conversion of time entries from Toggl and awork to a Clockify-compatible CSV format.