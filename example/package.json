// package.ts

// This file is an example TypeScript file based on the name `package.json`.

// Define a simple interface for a package
interface Package {
    name: string;
    version: string;
    description?: string;
    main?: string;
    scripts?: {
        [key: string]: string;
    };
    dependencies?: {
        [key: string]: string;
    };
    devDependencies?: {
        [key: string]: string;
    };
}

// Create a sample package object
const samplePackage: Package = {
    name: "example-package",
    version: "1.0.0",
    description: "This is an example package",
    main: "index.js",
    scripts: {
        start: "node index.js",
        test: "jest"
    },
    dependencies: {
        "express": "^4.17.1"
    },
    devDependencies: {
        "jest": "^26.6.3"
    }
};

// Function to display package information
function displayPackageInfo(pkg: Package): void {
    console.log(`Package Name: ${pkg.name}`);
    console.log(`Version: ${pkg.version}`);
    if (pkg.description) {
        console.log(`Description: ${pkg.description}`);
    }
    if (pkg.main) {
        console.log(`Main file: ${pkg.main}`);
    }
    if (pkg.scripts) {
        console.log("Scripts:");
        for (const script in pkg.scripts) {
            console.log(`  ${script}: ${pkg.scripts[script]}`);
        }
    }
    if (pkg.dependencies) {
        console.log("Dependencies:");
        for (const dep in pkg.dependencies) {
            console.log(`  ${dep}: ${pkg.dependencies[dep]}`);
        }
    }
    if (pkg.devDependencies) {
        console.log("Dev Dependencies:");
        for (const devDep in pkg.devDependencies) {
            console.log(`  ${devDep}: ${pkg.devDependencies[devDep]}`);
        }
    }
}

// Display the sample package information
displayPackageInfo(samplePackage);
