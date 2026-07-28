import { build } from 'esbuild'
import { mkdir, writeFile, rm, readFile } from 'fs/promises'
import { existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createHash } from 'crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'build', 'revenge')
const sourceFile = join(__dirname, '..', 'src', 'plugin.raw.js')

if (existsSync(outDir)) {
    await rm(outDir, { recursive: true })
}

await mkdir(outDir, { recursive: true })

let source = await readFile(sourceFile, 'utf-8')

const wrapped = `(function(d,vendetta){"use strict";
var i = vendetta.plugin, n = vendetta, c = vendetta.metro.common, m = vendetta.metro, s = vendetta.storage;
${source}
initModules(vendetta);
d.default={onLoad:onLoad,onUnload:onUnload,settings:Settings};
Object.defineProperty(d,"__esModule",{value:!0});
return d})({},vendetta)`

await writeFile(join(outDir, 'raw.js'), wrapped)

await build({
    entryPoints: [join(outDir, 'raw.js')],
    outfile: join(outDir, 'index.js'),
    bundle: false,
    minify: true,
    sourcemap: false,
    target: 'es2020',
})

await rm(join(outDir, 'raw.js'))

let final = await readFile(join(outDir, 'index.js'), 'utf-8')
final = final.replace(/^"use strict";\s*/, '')
await writeFile(join(outDir, 'index.js'), final)

const jsContent = await readFile(join(outDir, 'index.js'))
const hash = createHash('sha256').update(jsContent).digest('hex')

const manifest = {
    name: 'LarpPlugin',
    description: 'Fake your Discord profile for LARPing - username, email, badges, avatar, bio and more',
    authors: [
        {
            name: 'todyaramello',
            id: '1105562368433459321',
        },
    ],
    main: 'index.js',
    hash,
    vendetta: {
        icon: 'PersonStandingIcon',
    },
}

await writeFile(join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 4))

console.log('Build successful! Output in build/revenge/')
