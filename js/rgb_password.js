/*
*
* RGB Password
* @author: James White
* @date: 19/11/11
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
	
	};
	
	var characters = [
		
		"a","A","b","B","c","C","d","D","e","E","f","F","g","G","h","H","i","I","j", "J","k","K","l","L","m","M","n","N","o","O","p","P","q","Q","r","R","s","S","t","T","u","U","v","V","w","W","x","X","y","Y","z","Z","1","2","3","4","5","6","7","8","9", "0", ".", "_"
		
	];
	
	var rgb = {};
	
	rgb.getValue = function (input) {
	
		// Split our string into 3 parts
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
		
		// If it is divisiable evenly by three then um, do so?
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
		
		function sortAscending(a, b) {
		
			return a - b;
		
		}
		
		function sortDescending(a, b) {
		
			return b - a;
		
		}
			
		// Loop through each slice of the password
		for(var slice_number in slices) {
		
			var slice = slices[slice_number],
				 character,
				 character_key,
				 character_value;
				
			for(colour in slice.rgb_value) {
				
				// Sort the array
				characters.sort();
				
				// for g we want to reverse it's order to ensure we
				// get nice pretty RGB colours!
				if( colour == 'g' ) {
				
					characters.reverse();
					
				}
				
				// and for b let's try randomising it's order
				else if( colour == 'b' ) {
				
					characters.sort(function() {
					
						return 0.5 - Math.random();
					
					});
					
				}
				
				// Loop through all the characters(and numbers) in our characters object
				for(character_key in characters) {
					
					character = characters[character_key];
					
					// Add 1 to the character key to avoid having 0 for the first
					// array value
					character_value = parseInt(character_key) + 1;
					
					if( slice.value.indexOf(character) !== -1 ) {
					
						slice.rgb_value[colour] = Math.floor( (255/64) * character_value);
						
						// We've found our character match, so let's not carry on looping
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