extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;
extern crate web_sys;
use web_sys::console;

#[wasm_bindgen]
pub fn elementary_ca(rule_number: u8, size: usize, num_generations: u32) {
    let rule: [u8; 8] = setup_rules(rule_number);
    let mut current_state: Vec<u8> = setup_initial_state(size);
    let mut current_gen = 0;

    while current_gen < num_generations {
        current_gen += 1;
        output_state(&current_state);
        current_state = calculate_next_state(current_state, rule);
    }
}

fn setup_rules(rule_number: u8) -> [u8; 8] {
    return [ 
        rule_number & 1,
        (rule_number >> 1) & 1,
        (rule_number >> 2) & 1,
        (rule_number >> 3) & 1,
        (rule_number >> 4) & 1,
        (rule_number >> 5) & 1,
        (rule_number >> 6) & 1,
        (rule_number >> 7) & 1,
    ];
}

fn setup_initial_state(size: usize) -> Vec<u8> {
    let mut initial_state = vec![0; size];
    let initial_active_cell_pos = size / 2 - 1;

    initial_state[initial_active_cell_pos] = 1;

    return initial_state;
}

fn output_state(state: &Vec<u8>) {
    let mut output: Vec<char> = Vec::new();

    for cell in state{
        if *cell == 1 {
            output.push('\u{2588}');
            output.push('\u{2588}');
        }
        else {
            output.push('\u{0020}');
            output.push('\u{0020}');
        }
    }

    let output_string: String = output.into_iter().collect();
    let js_value = JsValue::from_str(&output_string);
    console::log_1(&js_value);
}

fn calculate_next_state(state: Vec<u8>, rule: [u8; 8]) -> Vec<u8> {
    let mut next_state: Vec<u8> = Vec::new();

    for (i, current_cell) in state.iter().enumerate() {
        let mut prev_cell: u8 = state[0];
        let mut next_cell: u8 = *state.last().unwrap();

        if i > 0 {
            prev_cell = state[i - 1];
        }

        if i < state.len() - 1{
            next_cell = state[i+1];
        }
        
        let rule_index = prev_cell * 4 + current_cell * 2 + next_cell * 1;

        let new_cell_state = rule[rule_index as usize];
        next_state.push(new_cell_state);
    }

    return next_state;
}

