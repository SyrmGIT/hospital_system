<script lang="ts">
	export let form: any;

	let roles = 'consultant';

	console.log(roles);
</script>

<div class="register-content-wrapper">
	<div class="register-header">
		<h1>Register</h1>
		<p>Please register to access the panel</p>
	</div>

	{#if form}
		<div class="alert warning">
			Please correct the following errors:
			<ul>
				{#each form.error as error}
					<li>{error}</li>
				{/each}
			</ul>
		</div>
	{/if}

	<form method="post">
		<div class="input-boxes">
			<div class="roles">
				<input bind:group={roles} type="radio" name="role" id="consultant" value="consultant" />
				<label for="consultant">Consultant</label>
				<input bind:group={roles} type="radio" name="role" id="nurse" value="nurse" />
				<label for="nurse">Nurse</label>
			</div>
			<div class="name">
				<label for="fname">First Name</label>
				<input type="text" name="fname" id="fname" required />
				<label for="lname">Last Name</label>
				<input type="text" name="lname" id="lname" required />
			</div>
			<label for="email">Email</label>
			<input type="email" name="email" id="email" />
			<div class="password">
				<label for="password">Password</label>
				<input type="password" name="password" id="password" required />
				<label for="cpassword">Confirm Password</label>
				<input type="password" name="cpassword" id="cpassword" required />
			</div>
			{#if roles === 'consultant'}
				<label for="specialism">Specialism</label>
				<input type="text" name="specialism" id="specialism" required />
			{/if}
			{#if roles === 'nurse'}
				<label for="ward">Ward</label>
				<input type="text" name="ward" id="ward" required />
			{/if}
			<button type="submit" class="submit-btn">Register</button>
		</div>
	</form>
</div>
