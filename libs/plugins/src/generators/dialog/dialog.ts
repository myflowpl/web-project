import {
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { DialogGeneratorSchema } from './schema';
import { strings } from '@angular-devkit/core'

export async function dialogGenerator(
  tree: Tree,
  options: DialogGeneratorSchema
) {

  const dirParts = options.name.split('/')
  dirParts.pop();
  const projectRoot = `${options.path || ''}/${dirParts.join('/')}`;
  const name = strings.dasherize(options.name.split('/').pop() || options.name);

  const vars = {
    name: name,
    dirName: name,
    injectFnName: `inject${strings.classify(name)}Dialog`,
    componentClassName: `${strings.classify(name)}Dialog`,
    dataClassName: `${strings.classify(name)}DialogData`,
    resultClassName: `${strings.classify(name)}DialogResponse`,

  }

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, vars);

  await formatFiles(tree);
}

export default dialogGenerator;
