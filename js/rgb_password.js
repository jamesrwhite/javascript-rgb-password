/*
*
* RGB Password
* @author: James White
* @date: 20/11/11
*
*/

window.onload = function() {

	var password = {
			
		selector: document.getElementById("password"),
		hash_selector: document.getElementById("password_hash"),
		
	};
	
	password.selector.onkeyup = function() {
	
		var rgb_values = rgb.getValue(this.value);
		
		document.getElementById("one").style.backgroundColor = "rgb("
			+ rgb_values.one.r + ", "
			+ rgb_values.one.g + ", "
			+ rgb_values.one.b +
		")";
				
		document.getElementById("two").style.backgroundColor = "rgb("
			+ rgb_values.two.r + ", "
			+ rgb_values.two.g + ", "
			+ rgb_values.two.b +
		")";
		
		document.getElementById("three").style.backgroundColor = "rgb("
			+ rgb_values.three.r + ", "
			+ rgb_values.three.g + ", "
			+ rgb_values.three.b +
		")";
		
		console.log("1: " + document.getElementById("one").style.backgroundColor);
		console.log("2: " + document.getElementById("two").style.backgroundColor);
		console.log("3: " + document.getElementById("three").style.backgroundColor);
	
	};
	
	var characters = ["p", "J", "i", "3", "M", "g", "U", "x", "Z", "B", "w", "S", "W", "u", "j", "A", "D", "Q", "N", "s", "K", "G", "O", "z", "_", "l", "H", "R", "k", "6", "b", "h", "q", "d", "e", "Y", "1", "c", ".", "4", "v", "L", "y", "f", "7", "2", "V", "0", "a", "n", "E", "F", "5", "9", "8", "m", "r", "t", "X", "C", "I", "T", "P", "o"];
	
	var rgb = {};
	
	rgb.getValue = function (input) {
	
		// Set up our slices object and it's default values
		var slices = {
		
			one: {
			
				length: 0,
				value: "",
				rgb_value: {
				
					r: 255,
					g: 255,
					b: 255
				
				}
			
			},
			
			two: {
			
				length: 0,
				value: "",
				rgb_value: {
				
					r: 255,
					g: 255,
					b: 255
				
				}
			
			},
			
			three: {
			
				length: 0,
				value: "",
				rgb_value: {
				
					r: 255,
					g: 255,
					b: 255
				
				}
			
			}
		
		}
		
		// If possible divide the password into 3 equals slices
		if( input.length % 3 === 0 ) {
		
			slices.one.length = input.length / 3;
			slices.two.length = input.length / 3;
			slices.three.length = input.length / 3;
		
		}
		
		// Otherwise try and split up as evenly as we can
		else {
		
			var rounded_third = Math.ceil(input.length / 3);
		
			slices.one.length = rounded_third; // 33%
			slices.two.length = rounded_third; // 33%
			slices.three.length = input.length - (2 * rounded_third); // 34%
		
		}
		
		// Slice up the password!
		slices.one.value = input.substr(0, slices.one.length);
		slices.two.value = input.substr(slices.one.length, slices.two.length);
		slices.three.value = input.substr(slices.two.length, slices.three.length);
			
		// Loop through each slice of the password
		for(var slice_number in slices) {
		
			var slice = slices[slice_number],
				 character,
				 character_key,
				 character_value;
				
			for(colour in slice.rgb_value) {
				
				// Take a copy of the array so we don"t
				// mess up the original random order it"s in
				characters_array = characters;
				
				// Need to find a better way of sorting the array's
				// that isn't random so the patterns can still be
				// recognised each time but still produces enough
				// different colours
				
				if( colour == "r" ) {
				
					characters_array.reverse();
				
				}
				
				//else if( colour == "g" ) {
				
					// Nothing much going on here..
					
				//}
				
				else if( colour == "b" ) {
				
					characters_array.reverse();
					
				}
				
				// Loop through all the characters(and numbers) in our characters object
				for(character_key in characters_array) {
					
					character = characters_array[character_key];
					
					// Add 20 to the character value so we get some
					// *slightly* nicer colours
					character_value = parseInt(character_key) + 15;
					
					if( slice.value.indexOf(character) !== -1 ) {
					
						slice.rgb_value[colour] = Math.floor( (240/64) * character_value);
						
						// We"ve found our character match, so let's not carry on looping
						break;
					
					}
					
				}
			
			}
		
		}
		
		return {
		
			one: slices.one.rgb_value,
			two: slices.two.rgb_value,
			three: slices.three.rgb_value,
		
		};
	
	}
	
};