create or replace function new_notify() returns trigger as 
$run_pedidos_after$
declare
	begin
		perform pg_notify(cast('pedidos_new' as text), row_to_json(NEW)::text);
		return new;
	end;

$run_pedidos_after$
language 'plpgsql';

--drop trigger run_pedidos_after on pedidos;

create trigger run_pedidos_after after insert on pedidos 
	for each row execute procedure new_notify();