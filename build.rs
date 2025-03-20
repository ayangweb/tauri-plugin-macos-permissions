const COMMANDS: &[&str] = &[
    "check_accessibility_permission",
    "request_accessibility_permission",
    "check_full_disk_access_permission",
    "request_full_disk_access_permission",
    "check_screen_recording_permission",
    "request_screen_recording_permission",
    "check_microphone_permission",
    "request_microphone_permission",
    "check_camera_permission",
    "request_camera_permission",
];

fn main() {
    tauri_plugin::Builder::new(COMMANDS).build();
}
