module.exports = {
  packagerConfig: {
    asar: true
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {}
    },
    // macOS: produces a portable .zip containing the .app bundle.
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin']
    },
    // Linux distributions using the Debian packaging format, including many
    // UOS and Kylin deployments.
    {
      name: '@electron-forge/maker-deb',
      platforms: ['linux'],
      config: {}
    },
    // Linux distributions using the RPM packaging format.
    {
      name: '@electron-forge/maker-rpm',
      platforms: ['linux'],
      config: {}
    }
  ]
}
