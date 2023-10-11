# Youbike realtime information

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This project is a web application that provides real-time information about YouBike stations in Taipei City and optionally other cities. It is designed to follow a specific Figma design, offer responsive web design (RWD), and integrate with the Taipei City YouBike API. The project is developed using React.

## Table of Contents

- [Live Demo](#live-demo)
- [Features](#features)
- [Installation](#installation)

## Live Demo

Check out the live demo of the Rick and Morty Character Explorer [here](https://lovecamilletw.github.io/youbike-realtime/).

## Features

### Virtualized List with React Virtuoso

- Utilizes [React Virtuoso](https://virtuoso.dev/) to efficiently render a virtualized list of YouBike station information.
- Provides a smooth and high-performance user experience when browsing through a large dataset.
- The virtualized list seamlessly integrates with the overall design and responsiveness of the application, providing an optimal user experience on various devices.

## Installation

```shell
git clone https://github.com/loveCamilleTW/youbike-realtime.git
cd youbike-realtime
npm install && npm run dev
```
