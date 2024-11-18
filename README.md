# tauri-plugin-macos-permissions

> This plugin only works on tauri v2, if you need the v1 plugin, feel free to submit a PR!

Accessibility and full disk access for macOS can be checked and requested.

https://github.com/user-attachments/assets/547a920c-29ef-4cd4-bba7-3e58c3f3bcd0

## Install

```shell
cargo add tauri-plugin-macos-permissions
```

You can install the JavaScript Guest bindings using your preferred JavaScript package manager:

```shell
pnpm add tauri-plugin-macos-permissions-api
```

## Usage

`src-tauri/src/lib.rs`

```diff
pub fn run() {
    tauri::Builder::default()
+       .plugin(tauri_plugin_macos_permissions::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

`src-tauri/capabilities/default.json`

```diff
{
    ...
    "permissions": [
        ...
+       "macos-permissions:default"
    ]
}
```

Afterwards all the plugin's APIs are available through the JavaScript guest bindings:

```ts
import {
  checkAccessibilityPermissions,
  checkFullDiskAccessPermissions,
  requestAccessibilityPermissions,
  requestFullDiskAccessPermissions,
} from "tauri-plugin-macos-permissions-api";

await checkAccessibilityPermissions();
await checkFullDiskAccessPermissions();
await requestAccessibilityPermissions();
await requestFullDiskAccessPermissions();
```

## Example

```shell
git clone https://github.com/ayangweb/tauri-plugin-macos-permissions.git
```

```shell
pnpm install

cd examples/tauri-app

pnpm install

pnpm run dev
```
