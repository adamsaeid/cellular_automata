use std::cmp;
use std::mem;

fn main() {
    let mut next_state: Vec<u8> = Vec::new();
    let mut current_state: Vec<u8> = Vec::new();

    const PADDING: u32 = 100;

    let mut pos = 0;

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

        for (i, el) in current_state.iter().enumerate() {
            let mut start_index = 0;

            if i > 0 {
                start_index = i - 1;
            }            

            let end_index = cmp::min(current_state.len() - 1, i + 1);

            let nhood = &current_state[start_index..end_index + 1];
            let sum: u8 = nhood.iter().sum();

            if sum == 0 || sum == 3 {
                next_state.push(0);        
            } else {
                next_state.push(1);
            }
        }

        mem::swap(&mut current_state, &mut next_state);
        next_state.clear();
    }
}

