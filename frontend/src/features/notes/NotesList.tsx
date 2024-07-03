/** @format */

import React from "react";
import { useGetNotesQuery } from "./notesApiSlice";

const NotesList = () => {
	const { data: notes, error, isLoading, refetch } = useGetNotesQuery();
	// refetch();
	console.log(notes);
	return (
		<div>
			{/* {isLoading && <div>Loading...</div>}
			{error && <div>Error: {error}</div>} */}
		</div>
	);
};

export default NotesList;
