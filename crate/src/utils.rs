use cfg_if::cfg_if;
// use wasm_bindgen::prelude::*;
// use web_sys::console;

pub fn rand_int(n: i32) -> i32 {
    (js_sys::Math::random() * n as f64) as i32
}

pub fn once_in(n: i32) -> bool {
    rand_int(n) == 0
}
// pub fn rand_int(n: u8) -> u8 {
//     (js_sys::Math::random() * n as f64) as u8
// }

pub fn rand_dir() -> i32 {
    let i = rand_int(1000);
    (i % 3) - 1
}
pub fn rand_dir_2() -> i32 {
    let i = rand_int(1000);
    if (i % 2) == 0 {
        -1
    } else {
        1
    }
}

pub fn rand_vec() -> (i32, i32) {
    let i = rand_int(2000);
    match i % 9 {
        0 => (1, 1),
        1 => (1, 0),
        2 => (1, -1),

        3 => (0, -1),
        4 => (-1, -1),
        5 => (-1, 0),
        6 => (-1, 1),
        7 => (0, 1),
        _ => (0, 0),
    }
}

pub fn rand_vec_ennnws() -> (i32, i32) {
    let i = rand_int(25147);
    // let mut js: JsValue = (i % 3).into();
    // console::log_2(&"conservation: ".into(), &js);
    match i % 9 {
        0 => (1, 0),
        1 => (1, 0),
        2 => (-1, 0),
        3 => (-1, 0),
        // 4 => (0, 1),
        _ => (0, -1),
    }
}
// pub fn rand_vec_down_5() -> (i32, i32) {
//     let i = rand_int(25147);
//     match i % 6 {
//         0 => (1, 0),
//         1 => (1, 1),
//         3 => (0, 1),
//         4 => (-1, 1),
//         _ => (-1, 0),
//     }
// }

// pub fn rand_vec_up_5() -> (i32, i32) {
//     let i = rand_int(25147);
//     match i % 6 {
//         0 => (1, 0),
//         1 => (1, -1),
//         3 => (0, -1),
//         4 => (-1, -1),
//         _ => (-1, 0),
//     }
// }

// pub fn rand_vec_horizontal_6() -> (i32, i32) {
//     let i = rand_int(25147);
//     match i % 6 {
//         0 => (1, 1),
//         1 => (1, 0),
//         2 => (1, -1),
//         3 => (-1, -1),
//         4 => (-1, 0),
//         _ => (-1, 1),
//     }
// }
pub fn rand_vec_8() -> (i32, i32) {
    let i = rand_int(25147);
    match i % 8 {
        0 => (1, 1),
        1 => (1, 0),
        2 => (1, -1),

        3 => (0, -1),
        4 => (-1, -1),
        5 => (-1, 0),
        6 => (-1, 1),
        _ => (0, 1),
    }
}
pub fn adjacency_right(dir: (i32, i32)) -> (i32, i32) {
    match dir {
        (0, 1) => (1, 1),
        (1, 1) => (1, 0),
        (1, 0) => (1, -1),
        (1, -1) => (0, -1),
        (0, -1) => (-1, -1),
        (-1, -1) => (-1, 0),
        (-1, 0) => (-1, 1),
        (-1, 1) => (0, 1),
        _ => (0, 0),
    }
}
pub fn adjacency_left(dir: (i32, i32)) -> (i32, i32) {
    match dir {
        (0, 1) => (-1, 1),
        (1, 1) => (0, 1),
        (1, 0) => (1, 1),
        (1, -1) => (1, 0),
        (0, -1) => (1, -1),
        (-1, -1) => (0, -1),
        (-1, 0) => (-1, -1),
        (-1, 1) => (-1, 0),
        _ => (0, 0),
    }
}
pub fn join_dx_dy(dx: i32, dy: i32, p: u8) -> u8 {
    ((((dx + 1) * 3) + (dy + 1)) as u8) + p * 9
}

pub fn split_dx_dy(i: u8) -> (i32, i32, u8) {
    let s: i32 = i as i32 % 9;
    let rem = i / 9;
    let dx: i32 = (s / 3) - 1;

    let dy: i32 = (s % 3) - 1;

    (dx, dy, rem)
}

cfg_if! {
    // When the `console_error_panic_hook` feature is enabled, we can call the
    // `set_panic_hook` function at least once during initialization, and then
    // we will get better error messages if our code ever panics.
    //
    // For more details see
    // https://github.com/rustwasm/console_error_panic_hook#readme
    if #[cfg(feature = "console_error_panic_hook")] {
        extern crate console_error_panic_hook;
        pub use self::console_error_panic_hook::set_once as set_panic_hook;
    } else {
        #[inline]
         pub fn set_panic_hook() {}
    }
}
