import { Component, createSignal } from 'solid-js';
import SettingsDialog from './settings';

const Header: Component = () => {
	const [isSettingsDialogOpen, setIsSettingsDialogOpen] = createSignal(false);

	const toggleSettingsDialog = () => {
		setIsSettingsDialogOpen(!isSettingsDialogOpen());
	};

	return (
		<nav class="">
			<div class="flex items-center justify-between p-4 border-b">
				<div class="flex items-center space-x-4">
					<a href="#" class="text-lg font-semibold flex items-center">
						<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.005 11.19V12l6.998 4.042L19 12v-.81M5 16.15v.81L11.997 21l6.998-4.042v-.81M12.003 3 5.005 7.042l6.998 4.042L19 7.042 12.003 3Z"/>
						</svg>

						<span>simple-design-tool</span>
					</a>
				</div>

				<div class="flex items-center space-x-4">
					<button onClick={toggleSettingsDialog} class="text-sm font-semibold">
						Settings
					</button>
				</div>
			</div>

			{isSettingsDialogOpen() && <SettingsDialog toggleSettingsDialog={toggleSettingsDialog} />}
		</nav>
	);
};

export default Header;
