cd apps/aptos-boilerplate
bunx npm-check-updates -u
rm -rf node_modules
rm -rf .next

cd ../../apps/landing-page/
bunx npm-check-updates -u
rm -rf node_modules
rm -rf .next

cd ../../packages/ui/
bunx npm-check-updates -u
rm -rf node_modules

cd ../../packages/eslint-config/
bunx npm-check-updates -u
rm -rf node_modules

cd ../../packages/typescript-config/
bunx npm-check-updates -u
rm -rf node_modules


cd ../../packages/contract/
bunx npm-check-updates -u
rm -rf node_modules

cd ../../
bunx npm-check-updates -u
rm -rf node_modules

bun i
