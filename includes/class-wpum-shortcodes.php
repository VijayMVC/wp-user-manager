<?php
/**
 * Shortcodes
 *
 * @package     wp-user-manager
 * @copyright   Copyright (c) 2015, Alessandro Tesoro
 * @license     http://opensource.org/licenses/gpl-2.0.php GNU Public License
 * @since       1.0.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * WPUM_Shortcodes Class
 * Registers shortcodes together with a shortcodes editor.
 *
 * @since 1.0.0
 */
class WPUM_Shortcodes {

	/**
	 * __construct function.
	 *
	 * @access public
	 * @return void
	 */
	public function __construct() {
		
		add_filter( 'widget_text', 'do_shortcode' );
		add_shortcode( 'wpum_login_form', array( $this, 'wpum_login_form' ) );

	}

	/**
	 * Login Form Shortcode
	 *
	 * @access public
	 * @since  1.0.0
	 * @return $output shortcode output
	 */
	public function wpum_login_form( $atts, $content=null ) {

		extract( shortcode_atts( array(
			'id'             => '',
			'redirect'       => '',
			'label_username' => '',
			'label_password' => '',
			'label_remember' => '',
			'label_log_in'   => ''
		), $atts ) );

		// Set default values if options missing
		if(empty($id))
			$id = 'wpum_loginform';
		if(empty($redirect))
			$redirect = site_url( $_SERVER['REQUEST_URI'] );
		if(empty($label_username))
			$label_username = __('Username');
		if(empty($label_password))
			$label_password = __('Password');
		if(empty($label_remember))
			$label_remember = __('Remember Me');
		if(empty($label_log_in))
			$label_log_in = __('Login');

		$args = array(
			'echo'           => true,
			'redirect'       => esc_url($redirect),
			'form_id'        => esc_attr($id),
			'label_username' => esc_attr($label_username),
			'label_password' => esc_attr($label_password),
			'label_remember' => esc_attr($label_remember),
			'label_log_in'   => esc_attr($label_log_in),
			'id_username'    => esc_attr($id).'user_login',
			'id_password'    => esc_attr($id).'user_pass',
			'id_remember'    => esc_attr($id).'rememberme',
			'id_submit'      => esc_attr($id).'wp-submit',
		);

		ob_start();

		// Show already logged in message
		if( is_user_logged_in() ) :

			get_wpum_template( 'already-logged-in.php', 
				array(
					'args' => $args,
					'atts' => $atts,
				)
			);

		// Show login form if not logged in
		else :

			get_wpum_template( 'login-form.php', 
				array(
					'args' => $args,
					'atts' => $atts,
				)
			);

		endif;

		$output = ob_get_clean();

		return $output;

	}

}

new WPUM_Shortcodes;