import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';
import {  externalSchematic, mergeWith, apply, url, template, chain, MergeStrategy, move } from "@angular-devkit/schematics";
import { strings } from "@angular-devkit/core";

// export default async function (tree: Tree, schema: any) {
export default function (schema: any) {
return (_tree: Tree) => {


  const templateSource = apply(
    url('./files'), [
      template({
        // props for template
        name: schema.name,
        className: strings.classify(schema.name),
        entityName: strings.camelize(schema.name),
        elementName: strings.dasherize(schema.name),
        dasherize: strings.dasherize,
      }),
      move(schema.name),
    ]
  )
    // return () => templateSource;
  return chain([
    externalSchematic('@schematics/angular', 'component', {name: 'common-ui/src/lib/confirm'}),
    mergeWith(templateSource, MergeStrategy.Overwrite),
  ]);
}
}
