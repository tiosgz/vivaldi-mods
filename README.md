# Modifications of Vivaldi browser

Mods I use or have used in [Vivaldi](https://vivaldi.com/). Not all are by me — don't be surprised when you find your mod here (I tried to include name of the original author in the description below, but I may not be accurate). Some have a JS and a CSS part — that should be mentioned at the beginning of both files. Some of the mods may not work.

If you use JustDanPo’s VivaldiHooks, it may be easier for you to run all these mods as hooks (so that you can enable/disable them per profile).

Don't forget to check also [luetage's](https://github.com/luetage/vivaldi_modding), [LonM's](https://github.com/LonMcGregor/VivaldiMods), [sjudenim's](https://github.com/sjudenim/Mods-for-Vivaldi) and [DenPo's](https://github.com/justdanpo/VivaldiHooks) mods!

If you don't know how to apply them, follow [this tutorial](https://forum.vivaldi.net/topic/10549/modding-vivaldi).

*Tip: If you have multiple profiles/installations and want to use different CSS mods, you can (at least in Linux) create links instead of copying files — thanks to this you have all profiles up to date with the main mods folder.*

## What do they do?

When I started writing this thing I was thinking it would look pretty different, but it unfortunately ended in just repeating the files' titles :-(. Well, I keep it, anyway.

### Changing icons

* `css/changing_icons/*`

These files change icons through the browser. Don't forget to look at [this forum thread](https://forum.vivaldi.net/topic/20227/changing-icons-with-css-part-ii)

* `adaptive_vivaldi_icon.css` forces the theme-adaptive version of menu icon. Look at the icon w/o this mod with dark/light theme, accent on addressbar/window
* `add_bookmark_icon.css` changes the add/edit bookmark button in the addressfield to a heart *(by retoree)*
* `extension_toggle_icon.css` changes the extension toggle to two bars `||` and reduces its width
* `navigation_toolbar_icons.css` changes icons of rewind/back/reload/forward/next/home buttons, but only if they're in the address bar (because of sizing issues) *(reload/stop icons by burbuja, some home versions by retoree or luetage or (I think) burbuja)*
* `panel_icons.css` changes icons of bookmarks, notes and (if you uncomment the area) history panel icons *(bookmarks by retoree&Narsis, notes by Narsis, history by burbuja)*
* `swiss_flag_in_panel.css` adds the Swiss cross above the first panel icon *(a part of [luetage's mod](https://luetage.vivaldi.net/swiss-theme-for-football-world-cup-2018/))*
* `tabs_trash_icon.css` changes the closed tabs button to three horizontal lines *(by luetage)*

### Fixes

* `css/fixes/*`

These just fix something that doesn't work (or didn't work when I made the mods).

* `fix_sd_thumbnail_images_size.css` – if you don't mess with correct sizing of the thumbnails
* `fix_themecolors_readability.css` – look at `vivaldi://themecolors` and you may understand
* `remove_zoom_toolbar_border.css` – the zoom controls show(ed) ugly border
* `scrollbar_corner_fix.css` just themes the scrollbar corner

### Minimalistic mods

* `css/minimalist/*`

These mods usually (auto-)hide part of the UI.

* `autohide_settings_sidebar.css` reduces it to only icons (unless moused over)
* `autohide_speeddial_navigation.css` – no need to explain
* `autoshrink_side_tabs.css` reduces the tab bar to only icons unless moused over (be careful with close buttons!)
* `bookmarks_hide_nickname.css` hides nickname in the bookmarks editor (previously also nick and description in the bookmarks manager tree)
* `hide_header_on_menu_button_only.css` hides the header if you use native window and other-than-top tabs (we still have Alt to access the menu)
* `hide_panel_headers.css` removes the obvious “Bookmarks” in bookmarks panel etc
* `minimal_addressbar.css` reduces un-`focus-within` address bar to just the address (also makes it smaller)
* `minimal_notes_panel.css` removes from notes panel everything above the tree plus creation date label
* `minimize_inactive_panel.css` hides icon-only panel (can be shown with mouse or just by opening any panel (keyboard, mouse gesture, menu etc))
* `minimum_height_tabbar.css` removes the spacing above tabs also in non-maximised windows
* `navigation_toolbar_toggle.css` is a CSS part of a JS mod (`js/addressbar_toolbar_toggle.js`)
* `siteinfo_text_on_hover.css` hides the site info text (unless moused over)
* `thinner_extension_toggle.css` reduces width of extension toggle button (see also `css/changing_icons/extension_toggle_icon.css`)

### Speed dial

* `css/speed_dial/*`

Do something with the start page.

* `hide_sd_folder_indicator.css` hides the colour bars at the top of folder thumbnails
* `no_sd_hover_zoom.css` if you don't like the zoom effect when mousing over a tile **(seems to be useless now)**
* `reduce_speed_dials_opacity.css` makes the tiles semi-transparent (another part of luetage's Swiss mod)
* `smaller_speeddial_margin.css` removes the unnecessary gap above the tiles
* `speeddial_autocolumns.css` ignores the Vivaldi's positioning and simply wraps the tiles only when needed (maybe also does something with their size)
* `speeddial_navigation_hide_bookmarks_history.css` removes the *Bookmarks* and *History* entries from the navigation toolbar
* `speeddial_thumbnail_size.css` allows you to give the tiles any size you want (now unnecessary because we have some choice in the settings)

### Tabs

* `css/tabs/*`

Obviously changes the tabs area.

* `domain_on_tab_thumb.css` is CSS part of a JS mod (`js/domain_on_tab_thumb.js`) (by bimlas)
* `dropdown_tab_stacks.css` allows you to switch stacked tabs from a list (useful with hidden popup thumbnails) (by LonM and oandreaus)
* `fixed_vertical_tabs_width.css` forces vertical tabs list to a given width (disables resizing)
* `hide_tab_audio_icon.css` should hide the speaker icon from tabs playing sound (not by me, but I really don't remember the author)
* `in-tab_group_indicators.css` moves stacking indicators *into* the tab header (only for bottom tabs)
* `minimal_tab_taskbar.css` makes bottom tab bar an overlay with only favicons
* `move_tab_audio_icon.css` moves the audio icon beside title (I think by retoree (?))
* `pinned_tab_indicator.css` adds a pin icon (unicode character) before pinned tabs' titles—useful with vertical tabs (again, I don't remember the author)
* `tabs_vertical_scrolling.css` allows you to vertically scroll bottom tabs (and view two rows at once)
* `unread_tab_indicator.css` makes unread tabs' title bold (I think by Hadden89)

### Themes and colors

* `css/themes_and_colors/*`

These files somehow change colors of the browser.

* `acrylic.css` makes things transparent (showing background image), now needs `js/browser_bg_image.js` and `js/window_size_to_css.js` (originally by LonM, but a lot edited)
* `addressbar_bookmarkbar_same_color.css` colors bookmarks bar the same as the address bar (and removes border)
* `speeddial_scrollbar.css` changes look of scrollbars on start page
* `tab_progress_indicator_color.css` colours the bars in loading background tabs to your theme's highlight colour
* `theme_colors_for_siteinfo.css` uses colours of your theme on the padlock in the address field
* `themed_download_progress.css` themes the blue progress bar in downloads panel
* `transparent_favicons.css` removes the white background from tab and panel favicons
* `transparent_sd_navigation.css` makes the navigation bar on start page transparent
* `transparent_sd_thumbnails.css` removes the background of tiles on the start page (in fact only makes them semi-transparent, but you can simply use `transparent`)
* `unify_opposite_window_borders_colors.css` — if you have tabs on the side, makes tabbar & panel and header & addressbar & statusbar the same colour (`&`'s are indicating the same color, `and` separating the two groups)
* `window_panel_do_not_disturb.css` dims all background tabs in the window panel making the active tab easier to find (and the panel less disturbing)

### Window control buttons

* `css/window_control_buttons/*`

These do something with the minimize/maximize/close buttons.

* `win10_like_window_control_buttons.css` changes the icons and sizes to look like on Windows 10
* `window_control_buttons_on_left.css` moves them to the left (Windows-only; Linux has this in the settings and Mac has this by default)

### Other CSS

* `css/*.css`

Just files I haven't categorised yet.

* `bottom_find_in_page.css` moves the find in page bar to the bottom
* `full_width_panels.css` forces the panels to cover all the window (is ready to do this only in narrow windows—just uncomment)
* `hide_extension_buttons.css` enables you to completely hide unused extensions' buttons
* `hide_inactive_sync.css` hides the sync button unless you are logged into the sync (depends on UI language)
* `margin_around_webpage.css` creates gap around the web page (nice with `css/themes_and_colors/acrylic.css`)
* `monospace_address.css` makes the address (and search field text) monospaced (by burbuja IIRC)
* `monospace_notes.css` makes notes monospace (only in the panel for now)
* `move_extension_toggle.css` moves the extension toggle button to the left
* `panel_scroll.css` allows you to scroll through the panel icons (cost is difficulty while adding panels)
* `remove_toolbars_border.css` removes borders from toolbars

### Javascript mods (`js/*`)

* `addressbar_toolbar_toggle.js` allows you to hide all unused buttons from the address bar (but you still can show them all) — needs `css/minimalist/navigation_toolbar_toggle.css`
* `autoscroll_to_active_tab.js` automatically scrolls the vertical tabs bar to the active tab
* `bookmarks_in_addressbar.js` moves the bookmarks bar into the address bar (right next to the address field)
* `browser_bg_image.js` is JS part of `css/themes_and_colors/acrylic.css`
* `domain_on_tab_thumb.js` puts the domain name on tabs pop up thubnails, needs `css/tabs/domain_on_tab_thumb.css` (by bimlas)
* `hidden_extension_popup.js` expands hidden extensions icons into a popup **(useless now)**
* `hide_addressbar_on_some_urls.js` allows you to hide the address bar on some URLs starting with a given string (useful for PWA)
* `history_panel_clock.js` makes the history panel icon show current time (by luetage)
* `import_export_search.js` adds buttons for importing/exporting search engines to the search settings (by luetage)
* `import_export_themes.js` adds buttons to import/export and sort your themes (by luetage)
* `notes_md_buttons.js` adds buttons for markdown formatting to the notes editor (seems to be broken now) (by tam710562)
* `old_vivaldi_user_agent.js` should restore the old Vivaldi's user agent string (nothing special, just code from UA switchers)
* `overlay_link_display.js` adds a menu item to display a link in a popup (by biruktes)
* `popup_buttons_manager.js` is a WIP helper for buttons with popups
* `profile_image.js` replaces the profile image with a generic themed icon (by luetage)
* `random_theme.js` adds a button to switch to a random theme (by luetage IIRC)
* `sd_icons.js` adds site icons to start page tiles titles (seems to be broken) (by tam710562 IIRC)
* `some_extensions_on_left.js` allows you to move given extensions' icons to the left of address bar
* `svg_panel_icons.js` allows you to add custom themed icons to web panels
* `tabs_horizontal_scroll.js` allows you to (horizontally) scroll horizontal tab bar
* `webpanel_icons.js` is a more complex version of `svg_panel_icons.js`
* `window_size_to_css.js` adds CSS variables with the window size and position

### Page actions

* `page_actions/*`

Things you can apply to webpages through the `<>` button (by default located in the status bar). Add them to `vivaldifolder/resources/vivaldi/user_files/`.

* `Disable_Links.js` makes clicking on any (already exising) link do nothing, good for pinned tabs *(by luetage)*
* `Guide_lines.js` allows you to create horizontal/vertical guides on the page (through buttons in the bottom right corner) – drag/shift+click to move, alt+click to delete *(by LonM)*
* `New_Tab_Links.js` is just a variation of `Disable_Links.js` that forces the links to open in new tab *(of course by luetage)*
