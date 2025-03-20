# tauri-plugin-macos-permissions

> This plugin only works on tauri v2, if you need the v1 plugin, feel free to submit a PR!

Support for checking and requesting macos system permissions.

https://github.com/user-attachments/assets/73d13bff-e7f8-47d4-98d8-3692de852760

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

If you need to access the microphone or camera permissions, please update `src-tauri/Info.plist`：

```diff
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
     ...
+    <key>NSMicrophoneUsageDescription</key>
+    <string>Describe why your app needs to use microphone permission</string>
+    <key>NSCameraUsageDescription</key>
+    <string>Describe why your app needs to use camera permissions</string>
</dict>
</plist>
```

Afterwards all the plugin's APIs are available through the JavaScript guest bindings:

```ts
import { checkAccessibilityPermission } from "tauri-plugin-macos-permissions-api";

const authorized = await checkAccessibilityPermission();
console.log(authorized); // true
```

## Methods

| Method                             | Description                          |
| ---------------------------------- | ------------------------------------ |
| `checkAccessibilityPermission`     | Check accessibility permission.      |
| `requestAccessibilityPermission`   | Request accessibility permission.    |
| `checkFullDiskAccessPermission`    | Check full disk access permission.   |
| `requestFullDiskAccessPermission`  | Request full disk access permission. |
| `checkScreenRecordingPermission`   | Check screen recording permission.   |
| `requestScreenRecordingPermission` | Request screen recording permission. |
| `checkMicrophonePermission`        | Check microphone permission.         |
| `requestMicrophonePermission`      | Request microphone permission.       |
| `checkCameraPermission`            | Check camera permission.             |
| `requestCameraPermission`          | Request camera permission.           |

## Example

```shell
git clone https://github.com/ayangweb/tauri-plugin-macos-permissions.git
```

```shell
pnpm install

pnpm build

cd examples/tauri-app

pnpm install

pnpm tauri dev
```

## Thanks

- Use [macos-accessibility-client](https://github.com/next-slide-please/macos-accessibility-client) to check and request accessibility permission.

- Use [FullDiskAccess](https://github.com/inket/FullDiskAccess/blob/846e04ea2b84fce843f47d7e7f3421189221829c/Sources/FullDiskAccess/FullDiskAccess.swift#L46) to check full disk access permission.

- Use [core-graphics](https://crates.io/crates/core-graphics) to check and request screen recording permission.

- Use [objc2](https://github.com/madsmtm/objc2) to check and request microphone or camera permissions.

## Who's Use It

- [EcoPaste](https://github.com/EcoPasteHub/EcoPaste) - Open source cross-platform clipboard management tool.

- [Coco AI](https://github.com/infinilabs/coco-app) - Search, Connect, Collaborate, Your Personal AI Search and Assistant, all in one space.
