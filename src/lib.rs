use tauri::{
    generate_handler,
    plugin::{Builder, TauriPlugin},
    Runtime,
};

mod commands;

pub use commands::*;

pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("macos-permissions")
        .invoke_handler(generate_handler![
            commands::check_accessibility_permission,
            commands::request_accessibility_permission,
            commands::check_full_disk_access_permission,
            commands::request_full_disk_access_permission,
            commands::check_screen_recording_permission,
            commands::request_screen_recording_permission,
            commands::check_microphone_permission,
            commands::request_microphone_permission,
        ])
        .build()
}
