## Setting up Import Sort in a project

Add `import-sort` and `import-sort-style-sanctuary` as dev dependencies:
```
yarn add --dev import-sort-cli
yarn add --dev 'https://github.com/sanctuarycomputer/import-sort-style-sanctuary.git'
```

Create a `.importsortrc` file in the same directory as your `package.json` with the following content:
```
{
  ".js, .jsx, .ts, .tsx": {
    "parser": "babylon",
    "style": "sanctuary"
  }
}
```

Add the following `sort-imports` (or whatever you want to call it) script to your `package.json`:
```
scripts: {
  "sort-imports": "import-sort --write './src/**/*.js'"
}
```
 This will recursively crawl your `./src` folder and sort the imports of any file with a `.js` extension. Feel free to
 modify this glob to fit your projects directories and file extensions.

To run:
```
yarn sort-imports
```

You can also add this to any pre-commit hooks to more strongly enforce project style.
