import {
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { DialogGeneratorSchema } from './schema';
import { strings } from "@angular-devkit/core";
 
export async function dialogGenerator(
  tree: Tree,
  options: DialogGeneratorSchema
) {

  if(!options.path) {
    options.path = '.';
  }
  
  const projectRoot = `${options.path}/${options.name}`;

  const vars = {
    name: options.name,
    dirName: options.name,
    injectFnName: `inject${strings.classify(options.name)}Dialog`,
    componentClassName: `${strings.classify(options.name)}Dialog`,
    dataClassName: `${strings.classify(options.name)}DialogData`,
    resultClassName: `${strings.classify(options.name)}DialogResponse`,

  }

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, vars);
  
  await formatFiles(tree);
}

export default dialogGenerator;
