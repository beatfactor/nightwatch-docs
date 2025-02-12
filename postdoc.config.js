import {env} from 'node:process';
import {sep, join, basename, resolve, extname} from 'node:path';

const {
  NIGHTWATCH_VERSION = '3.11.0',
  BASE_URL = 'https://nightwatchjs.org',
  MD_DOCS_FOLDER =  './docs',
  API_DOCS_FOLDER = resolve('../nightwatch/lib/api'),
  EXAMPLES_FOLDER = 'node_modules/nightwatch-examples/tests',
  WEBDRIVER_SPEC_URL = 'https://w3c.github.io/webdriver'
} = env;

export default {
  vite: {
    publicDir: resolve('./public'),
    plugins: [

    ]
  },

  session: {
    enable_prefetch: false,
    disable_spa: false
  },

  pwa: {
    enabled: false
  },

  directories: {
    output: './out',
    includes: 'src/includes',
    layouts: 'src/pages',
    content: MD_DOCS_FOLDER
  },

  ignore: {
    pages: ['**/{README,LICENSE}.md', '**/blog/**'],
    apidocs: ['**/_*/**', '**/_*.js', '**/api/index.js'],
    layouts: ['**/example-*.ejs']
  },

  apidocs: {
    source: API_DOCS_FOLDER,
    layout: 'api/index.ejs',
    source: '/path/to/nightwatch/lib/api/',

    createUrl(filePath) {
      const fileName = basename(filePath, extname(filePath));

      if (filePath.startsWith(sep + join('expect', 'assertions', 'elements'))) {
        return `/api/expect/elements/${fileName}.html`;
      }
      if (filePath.startsWith(sep + join('expect', 'assertions', 'element'))) {
        return `/api/expect/element/${fileName}.html`;
      }
      if (filePath.startsWith(sep + join('client-commands', 'window'))) {
        return `/api/window/${fileName}.html`;
      }
      if (filePath.startsWith(sep + join('client-commands', 'network'))) {
        return `/api/network/${fileName}.html`;
      }
      if (filePath.startsWith(sep + join('client-commands', 'document'))) {
        return `/api/document/${fileName}.html`;
      }
      if (filePath.startsWith(sep + join('client-commands', 'cookies'))) {
        return `/api/cookies/${fileName}.html`;
      }
      if (filePath.startsWith(sep + join('client-commands', 'alerts'))) {
        return `/api/alerts/${fileName}.html`;
      }
      if (filePath.startsWith(sep + join('protocol', 'appium'))) {
        return `/api/appium/${fileName}.html`;
      }
      if (filePath.startsWith(sep + 'protocol') || filePath.startsWith(sep + 'client-commands') || filePath.startsWith(sep + 'element-commands')) {
        return `/api/${fileName}.html`;
      }
      if (filePath.startsWith(sep + 'web-element') || filePath.startsWith(sep + 'commands')) {
        return `/api/element/${fileName}.html`;
      }
      if (filePath.includes('assertions')) {
        return `/api/assert/${fileName}.html`;
      }

      return filePath.replaceAll(sep, '/');
    }
  },

  appSettings: {
    version: NIGHTWATCH_VERSION,
    baseUrl: BASE_URL,
    webdriverSpecUrl: WEBDRIVER_SPEC_URL,
    apiRepoUrl: 'https://github.com',
    githubRepo: 'nightwatchjs/nightwatch',
    docsRepoUrl: 'https://github.com/nightwatchjs/nightwatch-docs/blob/',
    docsRepoBranch: 'versions/3.0',
    mdFolder: MD_DOCS_FOLDER,
    apiFolder: API_DOCS_FOLDER,
    examples: {
      output_folder: 'public/__examples',
      source_folder: EXAMPLES_FOLDER
    }
  },

  logger: {
    quiet: false
  }
};
