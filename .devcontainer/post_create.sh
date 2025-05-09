#!/bin/bash

sed -i 's/\(ZSH_THEME=\).*/\1robbyrussell/g' ${HOME}/.zshrc
npm install -g typescript ts-node pnpm@latest-10