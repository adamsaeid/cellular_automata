use std::cmp;
use std::mem;

fn main() {
    let mut next_state: Vec<u8> = Vec::new();
    let mut current_state: Vec<u8> = Vec::new();

    let rule_number: u8 = 126; 
    let rule: [u8; 8] = [
        rule_number & 1,
        (rule_number >> 1) & 1,
        (rule_number >> 2) & 1,
        (rule_number >> 3) & 1,
        (rule_number >> 4) & 1,
        (rule_number >> 5) & 1,
        (rule_number >> 6) & 1,
        (rule_number >> 7) & 1,
    ];

    let mut pos = 0;

    const PADDING: u8 = 100;
    while pos < PADDING {
      current_state.push(0);
      pos += 1;
    }

    current_state.push(1);

    pos = 0;
    while pos < PADDING {
        current_state.push(0);
        pos += 1;
    }

    const MAX_GENERATIONS: u32 = 500;

    let mut current_gen = 0;

    while current_gen < MAX_GENERATIONS {
        current_gen += 1;

        let mut output: Vec<char> = Vec::new();

        for cell in &current_state {
            if *cell == 1 {
                output.push('\u{2588}');
                output.push('\u{2588}');
            }
            else {
                output.push('\u{0020}');
                output.push('\u{0020}');
            }
        }

        let output: String = output.into_iter().collect();
        println!("{}",  output);

        for (i, current_cell) in current_state.iter().enumerate() {
            let mut prev_cell: u8 = current_state[0];
            let mut next_cell: u8 = *current_state.last().unwrap();

            if i > 0 {
                prev_cell = current_state[i - 1];
            }

            if i < current_state.len() - 1{
                next_cell = current_state[i+1];
            }
            
            let rule_index = prev_cell * 4 + current_cell * 2 + next_cell * 1;

            let new_cell_state = rule[rule_index as usize];
            next_state.push(new_cell_state);
       }

        mem::swap(&mut current_state, &mut next_state);
        next_state.clear();
    }
}

