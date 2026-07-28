import { build } from 'esbuild'
import { mkdir, writeFile, rm } from 'fs/promises'
import { existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'build', 'revenge')
const entryPoint = join(__dirname, '..', 'src', 'index.ts')

if (existsSync(outDir)) {
    await rm(outDir, { recursive: true })
}

await mkdir(outDir, { recursive: true })

await build({
    entryPoints: [entryPoint],
    bundle: true,
    outfile: join(outDir, 'index.js'),
    format: 'iife',
    target: 'es2020',
    platform: 'browser',
    minify: true,
    sourcemap: false,
    define: {
        'process.env.NODE_ENV': '"production"',
        'IS_DEV': 'false',
    },
    treeShaking: true,
    globalName: 'LarpPlugin',
    plugins: [
        {
            name: 'vendetta-resolve',
            setup(build) {
                build.onResolve({ filter: /^@vendetta\// }, args => ({
                    path: args.path,
                    namespace: 'vendetta-ns',
                }))

                build.onLoad({ filter: /.*/, namespace: 'vendetta-ns' }, args => {
                    const modPath = args.path
                        .replace('@vendetta/', '')
                        .split('/')
                    const camel = modPath
                        .map((s, i) => (i === 0 ? s : s[0].toUpperCase() + s.slice(1)))
                        .join('.')
                    const globalRef = `window.vendetta.${camel}`

                    return {
                        contents: `module.exports = ${globalRef};`,
                        loader: 'js',
                    }
                })
            },
        },
    ],
})

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
    vendetta: {
        icon: 'PersonStandingIcon',
    },
}

await writeFile(join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 4))

console.log('Build successful! Output in build/revenge/')
