<?php
    class Customer{
        private $id;
        private $name;
        private $birth_day;
        private $number_phone;
        private $image;
        private $address;
        private $gender;
        private $id_user;
        
        public function getId() {
            return $this->id;
        }
        
        public function setId($id) {
            $this->id = $id;
        }
        
        public function getName() {
            return $this->name;
        }
        
        public function setName($name) {
            $this->name = $name;
        }
        
        public function getBirthDay() {
            return $this->birth_day;
        }
        
        public function setBirthDay($birth_day) {
            $this->birth_day = $birth_day;
        }
        
        public function getNumberPhone() {
            return $this->number_phone;
        }
        
        public function setNumberPhone($number_phone) {
            $this->number_phone = $number_phone;
        }
        
        public function getImage() {
            return $this->image;
        }
        
        public function setImage($image) {
            $this->image = $image;
        }
        
        public function getAddress() {
            return $this->address;
        }
        
        public function setAddress($address) {
            $this->address = $address;
        }
        
        public function getGender() {
            return $this->gender;
        }
        
        public function setGender($gender) {
            $this->gender = $gender;
        }
        
        public function getIdUser() {
            return $this->id_user;
        }
        
        public function setIdUser($id_user) {
            $this->id_user = $id_user;
        }
        
        public function __construct($id, $name, $birth_day, $number_phone, $image, $address, $gender, $id_user) {
            $this->id = $id;
            $this->name = $name;
            $this->birth_day = $birth_day;
            $this->number_phone = $number_phone;
            $this->image = $image;
            $this->address = $address;
            $this->gender = $gender;
            $this->id_user = $id_user;
        }
        
        public function __toString() {
            return "Customer { id = $this->id, name = $this->name, birth_day = $this->birth_day, number_phone = $this->number_phone, image = $this->image, address = $this->address, gender = $this->gender, id_user = $this->id_user }";
        }
    }

?>