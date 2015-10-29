<?php
/**
 * Registers the multi select type field.
 *
 * @package     wp-user-manager
 * @copyright   Copyright (c) 2015, Alessandro Tesoro
 * @license     http://opensource.org/licenses/gpl-2.0.php GNU Public License
 * @since       1.2.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * WPUM_Field_Type_Username Class
 *
 * @since 1.2.0
 */
class WPUM_Field_Type_Multiselect extends WPUM_Field_Type {

	/**
	 * Constructor for the field type
	 *
	 * @since 1.2.0
 	 */
	public function __construct() {

		// DO NOT DELETE
		parent::__construct();

		// Label of this field type
		$this->name             = _x( 'Multi Select', 'field type name', 'wpum' );

		// Field type name
		$this->type             = 'multiselect';

		// Class of this field
		$this->class            = __CLASS__;

		// Set registration
		$this->set_registration = false;

		// Set requirement
		$this->set_requirement  = false;

		// Add repeater to this field type.
		$this->has_repeater     = true;

	}

}

new WPUM_Field_Type_Multiselect;