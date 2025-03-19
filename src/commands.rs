use tauri::{command, AppHandle, Runtime};

#[cfg(target_os = "macos")]
use {
    core_graphics::access::ScreenCaptureAccess,
    macos_accessibility_client::accessibility::{
        application_is_trusted, application_is_trusted_with_prompt,
    },
    objc::{class, msg_send, sel, sel_impl},
    objc_foundation::{INSString, NSString},
    std::{fs::read_dir, process::Command, ptr},
    tauri::Manager,
};

/// Check accessibility permission.
///
/// # Returns
/// - `bool`: `true` if accessibility permission are granted, `false` otherwise.
///
/// # Example
/// ```
/// use tauri_plugin_macos_permissions::check_accessibility_permission;
///
/// let authorized = check_accessibility_permission().await;
/// println!("Authorized: {}", authorized); // false
/// ```
#[command]
pub async fn check_accessibility_permission() -> bool {
    #[cfg(target_os = "macos")]
    return application_is_trusted();

    #[cfg(not(target_os = "macos"))]
    return true;
}

/// Request accessibility permission.
///
/// # Example
/// ```
/// use tauri_plugin_macos_permissions::request_accessibility_permission;
///
/// request_accessibility_permission().await;
/// ```
#[command]
pub async fn request_accessibility_permission() {
    #[cfg(target_os = "macos")]
    application_is_trusted_with_prompt();
}

/// Check full disk access permission.
///
/// # Returns
/// - `bool`: `true` if full disk access permission are granted, `false` otherwise.
///
/// # Example
/// ```
/// use tauri_plugin_macos_permissions::check_full_disk_access_permission;
///
/// let authorized = check_full_disk_access_permission(app_handle).await;
/// println!("Authorized: {}", authorized); // false
/// ```
#[command]
pub async fn check_full_disk_access_permission<R: Runtime>(app_handle: AppHandle<R>) -> bool {
    #[cfg(target_os = "macos")]
    {
        // Reference: https://github.com/inket/FullDiskAccess/blob/846e04ea2b84fce843f47d7e7f3421189221829c/Sources/FullDiskAccess/FullDiskAccess.swift#L46
        let check_dirs = vec!["Library/Containers/com.apple.stocks", "Library/Safari"];

        if let Ok(home_dir) = app_handle.path().home_dir() {
            for check_dir in check_dirs.iter() {
                if read_dir(&home_dir.join(check_dir)).is_ok() {
                    return true;
                }
            }
        }

        false
    }

    #[cfg(not(target_os = "macos"))]
    {
        let _ = app_handle;

        true
    }
}

/// Request full disk access permission.
///
/// # Example
/// ```
/// use tauri_plugin_macos_permissions::request_full_disk_access_permission;
///
/// request_full_disk_access_permission().await;
/// ```
#[command]
pub async fn request_full_disk_access_permission() -> Result<(), String> {
    #[cfg(target_os = "macos")]
    {
        Command::new("open")
            .arg("x-apple.systempreferences:com.apple.preference.security?Privacy_AllFiles")
            .output()
            .map_err(|error| error.to_string())?;
    }

    Ok(())
}

/// Check screen recording permission.
///
/// # Returns
/// - `bool`: `true` if screen recording permission are granted, `false` otherwise.
///
/// # Example
/// ```
/// use tauri_plugin_macos_permissions::check_screen_recording_permission;
///
/// let authorized = check_screen_recording_permission().await;
/// println!("Authorized: {}", authorized); // false
/// ```
#[command]
pub async fn check_screen_recording_permission() -> bool {
    #[cfg(target_os = "macos")]
    return ScreenCaptureAccess::preflight(&ScreenCaptureAccess::default());

    #[cfg(not(target_os = "macos"))]
    return true;
}

/// Request screen recording permission.
///
/// # Example
/// ```
/// use tauri_plugin_macos_permissions::request_screen_recording_permission;
///
/// request_screen_recording_permission().await;
/// ```
#[command]
pub async fn request_screen_recording_permission() {
    #[cfg(target_os = "macos")]
    ScreenCaptureAccess::request(&ScreenCaptureAccess::default());
}

/// Check microphone permission.
///
/// # Returns
/// - `bool`: `true` if microphone permission is granted, `false` otherwise.
///
/// # Example
/// ```
/// use tauri_plugin_macos_permissions::check_microphone_permission;
///
/// let authorized = check_microphone_permission().await;
/// println!("Authorized: {}", authorized); // false
/// ```
#[command]
pub async fn check_microphone_permission() -> bool {
    #[cfg(target_os = "macos")]
    {
        unsafe {
            let auth_status: i32 = msg_send![
                class!(AVCaptureDevice),
                authorizationStatusForMediaType: NSString::from_str("soun")
            ];

            return auth_status == 3;
        }
    }

    #[cfg(not(target_os = "macos"))]
    return true;
}

/// Request microphone permission.
///
/// # Example
/// ```
/// use tauri_plugin_macos_permissions::request_microphone_permission;
///
/// request_microphone_permission().await;
/// ```
#[command]
pub async fn request_microphone_permission() -> Result<(), String> {
    #[cfg(target_os = "macos")]
    {
        unsafe {
            let _: () = msg_send![
                class!(AVCaptureDevice),
                requestAccessForMediaType: NSString::from_str("soun")
                completionHandler: ptr::null::<()>()
            ];
        }
    }

    Ok(())
}
