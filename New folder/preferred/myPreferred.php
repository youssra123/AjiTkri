<?php

class myPreferred extends PreferredHandler {

	public function handle(){
		// TODO add actions to take here (Handle both GET and POST methods)
		// Create Dracula instance and execute the query method
		 switch ($this->getAction()){
			case 'findLast':
				(new Logger())->json((new Dracula())->query("SELECT MAX(id_quartier) as max FROM quartiers"));
			break;
			case 'logementsAll':
				(new Logger())->json((new Dracula())->query("SELECT * FROM quartiers NATURAL join logements NATURAL JOIN types  NATURAL join villes NATURAL join etats"));
			break;

		}
	}

}