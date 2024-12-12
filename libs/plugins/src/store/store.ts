import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { StoreGeneratorSchema } from './schema';
import { strings } from '@angular-devkit/core';

export async function storeGenerator(
  tree: Tree,
  options: StoreGeneratorSchema
) {
  const nameParts = options.name.split('/');
  const name = strings.dasherize(nameParts[nameParts.length-1])
  nameParts.pop();
  const projectRoot = nameParts.join('/');
  
  const vars = {
    projectRoot,
    name: name,
    nameClass: `${strings.classify(name)}`,
    className: `${strings.classify(name)}Store`,
    stateName: `${strings.classify(name)}State`,
    fileName: `${name}.store`,
  }
  // console.log('VARS', vars);

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, vars);

  await formatFiles(tree);
}

export default storeGenerator;
