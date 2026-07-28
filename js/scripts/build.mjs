import { build } from 'esbuild'
import { mkdir, writeFile, rm, readFile } from 'fs/promises'
import { existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createHash } from 'crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'build', 'revenge')
const entryPoint = join(__dirname, '..', 'src', 'index.ts')

if (existsSync(outDir)) {
    await rm(outDir, { recursive: true })
}

await mkdir(outDir, { recursive: true })

const vendettaMap = {
    '@vendetta/plugin': 'vendetta',
    '@vendetta/metro': 'vendetta.metro',
    '@vendetta/metro/common': 'vendetta.metro.common',
    '@vendetta/patcher': 'vendetta.patcher',
    '@vendetta/storage': 'vendetta.storage',
    '@vendetta/ui/components': 'vendetta.ui.components',
    '@vendetta/ui/assets': 'vendetta.ui.assets',
    '@vendetta/logger': 'vendetta.logger',
}

await build({
    entryPoints: [entryPoint],
    bundle: true,
    outfile: join(outDir, 'index.js'),
    format: 'cjs',
    target: 'es2020',
    platform: 'browser',
    minify: true,
    sourcemap: false,
    treeShaking: true,
    define: {
        'process.env.NODE_ENV': '"production"',
        'IS_DEV': 'false',
    },
    plugins: [
        {
            name: 'vendetta-resolve',
            setup(build) {
                build.onResolve({ filter: /^@vendetta\// }, args => ({
                    path: args.path,
                    namespace: 'vendetta-ns',
                }))

                build.onLoad({ filter: /.*/, namespace: 'vendetta-ns' }, args => ({
                    contents: `module.exports = ${vendettaMap[args.path] || args.path};`,
                    loader: 'js',
                }))
            },
        },
    ],
})

let code = await readFile(join(outDir, 'index.js'), 'utf-8')

code = `(function($__exp, vendetta) {
var module = { exports: $__exp };
var exports = $__exp;
${code.replace(/module\.exports\s*=/g, '$__exp =')}
return $__exp;
})({},vendetta)`

await writeFile(join(outDir, 'index.js'), code)

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
