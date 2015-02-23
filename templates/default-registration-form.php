<?php
/**
 * WPUM Template: Default Registration Form Template.
 *
 * Displays login form.
 *
 * @package     wp-user-manager
 * @copyright   Copyright (c) 2015, Alessandro Tesoro
 * @license     http://opensource.org/licenses/gpl-2.0.php GNU Public License
 * @since       1.0.0
 */
?>
<div id="wpum-form-register-<?php echo $atts['form_id'];?>" class="wpum-default-registration-form-wrapper" data-redirect="<?php echo $atts['redirect'];?>">

	<?php do_action( 'wpum_before_register_form_template', $atts ); ?>

	<form action="#" method="post" id="wpum-register-<?php echo $atts['form_id'];?>" class="wpum-default-registration-form" name="wpum-register-<?php echo $atts['form_id'];?>">

		<?php do_action( 'wpum_before_inside_register_form_template', $atts ); ?>

		<?php foreach ( $register_fields as $key => $field ) : ?>
			<fieldset class="fieldset-<?php esc_attr_e( $key ); ?>">
				<label for="<?php esc_attr_e( $key ); ?>"><?php echo $field['label']; ?></label>
				<div class="field <?php echo $field['required'] ? 'required-field' : ''; ?>">
					<?php get_wpum_template( 'form-fields/' . $field['type'] . '-field.php', array( 'key' => $key, 'field' => $field ) ); ?>
				</div>
			</fieldset>
		<?php endforeach; ?>

		<?php do_action( 'wpum_after_inside_register_form_template', $atts ); ?>

		<?php wp_nonce_field( 'wpum-register-nonce', 'security' ); ?>

		<p>
			<input type="hidden" name="wpum_submit_form" value="<?php echo $form; ?>" />
			<input type="submit" id="submit_wpum_register" name="submit_wpum_register" class="button" value="<?php _e('Register'); ?>" />
		</p>

	</form>

	<?php do_action( 'wpum_after_register_form_template', $atts ); ?>

</div>