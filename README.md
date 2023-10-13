# LinkTree App

This application is a simple LinkTree-style platform where users can create a profile with a custom description and upload their photo. Users can log in securely and add multiple links with descriptions to their profile.

## Features

- **User Profile:** Users can create their own profiles with a personalized description and profile picture.
- **Login System:** Secure login system for user authentication and profile management.
- **Link Management:** Users can add, edit, and delete links on their profiles, along with descriptions for each link.
- **Upload Photo:** Users can upload their profile pictures to personalize their profiles.

## Technologies Used

- Backend: Prisma with sqlite with NextJs
- Frontend: NextJs SSR
- Authentication: Simple JWT Authentication

## Installation

To get started with the LinkTree app, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/linktree-app.git`
2. Navigate to the project directory: `cd linktree-app`
3. Install dependencies: `npm install`
4. Set up the database configuration and environment variables.

create .env.local
```bash
SECRET_KEY_NEXT=super-secret-key
```

```bash
cd prisma
npx prisma db push
```

5. Run the application: `npm run dev`

## Usage

1. **Creating a Profile:** Sign up for an account and create your profile with a profile picture and description.
2. **Login:** Use your credentials to log in securely.
3. **Adding Links:** Add links to your profile along with custom descriptions.
4. **Editing and Deleting Links:** Modify or remove links from your profile as needed.

## Contributing

Contributions are always welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT](https://opensource.org/licenses/MIT) License.

## Contact

If you have any questions or suggestions regarding the LinkTree app, please feel free to reach out to us at [heitorrdpp@gmail.com].

