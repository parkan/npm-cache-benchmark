# npm install benchmarks

Benchmarks of [npm][1], [npm5][2], [shrinkpack][3], [yarn][4], and [pnpm][5] install times.

```
git clone https://github.com/JamieMason/npm-cache-benchmark.git
cd npm-cache-benchmark
npm install -g npm5@5.0.0-beta.36 shrinkpack@0.18.1 yarn@0.24.1 pnpm@0.67.0
node index.js
```

## Results (OS X)

| Installer | Average over 5 runs |
|:--|--:|
| yarn --offline | 5.88 |
| pnpm --offline | 6.72 |
| pnpm (cached) | 6.86 |
| npm 5.x (shrinkpacked, compressed) | 8.35 |
| npm 5.x (shrinkpacked) | 8.94 |
| npm 5.x (cached) | 11.36 |
| npm 4.x (cached) | 13.47 |
| yarn | 13.71 |
| npm 5.x | 14.93 |
| pnpm | 17.57 |
| npm 4.x (shrinkpacked, compressed) | 18.73 |
| npm 4.x (shrinkpacked) | 18.78 |
| npm 4.x | 29.73 |

Full results can be found in [results.json][6].

<!-- links -->
[1]: https://www.npmjs.com
[2]: https://www.npmjs.com/package/npm5
[3]: https://github.com/JamieMason/shrinkpack
[4]: https://github.com/yarnpkg/yarn
[5]: https://github.com/pnpm/pnpm
[6]: https://github.com/JamieMason/npm-cache-benchmark/blob/master/results.json
