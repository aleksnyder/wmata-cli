# WMATA CLI

Retrieve incoming trains without leaving your terminal.

All data comes from [WMATA Developer](https://developer.wmata.com/docs/services/) APIs.

## Install

In order to use wmata-cli, make sure that you have [Node](https://nodejs.org/) version 20.0.0 or higher.

```
$ npm install -g wmata-cli
```

## Usage

`wmata-cli` provides three main commands.

1. [`list` or `ls`](#list)
2. [`station` or `s`](#station)
3. [`incidents` or `i`](#incidents)

### List

List all stations belonging to the specified line color.  Trains can be listed from the Orange, Blue, Silver, Red, Green, and Yellow lines.

See all stations on the Orange line

```
$ wmata-cli list -c Orange
```

### Station

List all incoming trains belonging to the specified station.  If unsure of the station name use the [`list`](#list) command.

See all trains coming into the Smithsonian station

```
$ wmata-cli station Smithsonian
```

### Incidents

List any incidents affecting the system.  Most of the time this command will return nothing.

See all incidents throught the Metro system

```
$ wmata-cli incidents
```

## License

MIT
