// package.ts

// This file is an example TypeScript file based on the name `package.json`.

// Define a simple interface for a package
interface Package {
    name: string;
    version: string;
    description?: string;
    main?: string;
    scripts?: { [key: string]: string };
    dependencies?: { [key: string]: string };
    devDependencies?: { [key: string]: string };
}

// Example function to create a new package
function createPackage(name: string, version: string): Package {
    return {
        name,
        version,
        description: "A sample package",
        main: "index.js",
        scripts: {
            start: "node index.js",
            test: "echo \"Error: no test specified\" && exit 1"
        },
        dependencies: {
            "example-dependency": "^1.0.0"
        },
        devDependencies: {
            "example-dev-dependency": "^1.0.0"
        }
    };
}

// Example usage of the createPackage function
const myPackage = createPackage("my-sample-package", "1.0.0");
console.log(myPackage);
