var project_tags= function() {
	this.add_built_in_language_support= function() {
		this.add_language('js');
		this.add_language('vim');
		this.add_language('php');
	};

	this.add_language(tags_filename_or_extension, file_extension_list) {
		l.log('project_tags autoload add_language() start');
		var num_params= file_extension_list || 1;
		if(num_params !== 1)
			num_params= 2;
		if(num_params == 2) {
			var tags_filename= tags_filename_or_extension;
			if(typeof(file_extension_list) == 'string')
				var file_extension_list= [file_extension_list];
		} else { // num_params == 1
			var file_extension= tags_filename_or_extension;
			var tags_filename= file_extension + 'tags';
			var file_extension_list= [file_extension];
		};

		// not sure how to translate this so commenting it out for now
		// augroup <SID>mapping_group
		l.log('project-tags: setting up tag generation for ' + tags_filename + ' file');
		for(extension in file_extension_list) {
			var autocmd_string= 'autocmd BufRead *.' + extension + ' setlocal tags=./' + tags_filename + ';'
			l.log('project_tags: BufRead autocmd: ' + autocmd_string);
			// not sure how to getn an nvim object here, but if I had one:
			nvim.commandSync('execute ' + autocmd_string);
			var autocmd_string= 'autocmd bufwritepost *.' + extension + " silent call project_tags#generate_tags('" + tags_filename + "'";
			for(file_extension in file_extension_list) {
				var autocmd_string= autocmd_string + ", '" + file_extension + "'";
			};
			var autocmd_string= autocmd_string + ')';
			l.log('project_tags: bufwritepost autocmd: ' + autocmd_string);
			nvim.commandSync('execute ' + autocmd_string);
		};
		// not sure how to translate this so commenting it out for now
		// augroup END

		l.log('project_tags autoload add_language() end');
	}
};
