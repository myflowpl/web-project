import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { DialogGeneratorSchema } from './schema';

export async function dialogGenerator(
  tree: Tree,
  options: DialogGeneratorSchema
) {
  const projectRoot = `libs/${options.name}`;

  const vars = {
    name: options.name,
  }

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, vars);

  await formatFiles(tree);
}

export default dialogGenerator;
