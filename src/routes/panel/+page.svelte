<script lang="ts">
	export let data;

	let patients = data.patients;
	console.log(patients);
</script>

<div class="panel-bg">
	<div class="panel-wrapper">
		<div class="consultant-panel">
			<div class="panel-header">
				<div class="panel-header-title">
					<h1>Consultant - Patients</h1>
				</div>
				<div class="panel-header-actions">
					<a class="btn btn-primary" href="panel/add">Add</a>
				</div>
			</div>
			<div class="panel-content-wrapper">
				{#each patients as patient}
					<div class="user">
						<div class="user-id">
							<p>{patient.id}</p>
						</div>
						<div class="user-name">
							<h2>{patient.firstName}</h2>
							<h2>{patient.lastName}</h2>
						</div>
						<div class="user-email">
							<p>{patient.email}</p>
						</div>
						<div class="user-manage-buttons">
							<a class="button" href="panel/edit/{patient.id}">
								<i class="fa-solid fa-pencil" />
							</a>
							<a class="button" href="panel/delete/{patient.id}">
								<i class="fa-solid fa-trash" />
							</a>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
