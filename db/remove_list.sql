delete from lists
where id = $2;

select 
author_id,
team_id,
lists.id as list_id,
title as list_title,
name as board_name
from boards

join lists on boards.id = lists.board_id
where boards.id = $1
order by list_id;