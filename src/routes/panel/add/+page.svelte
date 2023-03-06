<script lang="ts">
	export let form: any;
</script>

<div class="panel-bg">
	<div class="panel-wrapper">
		<div class="consultant-panel">
			<div class="panel-header">
				<div class="panel-header-title">
					<h1>Add - Patients</h1>
				</div>
			</div>
			<div class="panel-content-wrapper">
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
				<div class="form-wrapper">
					<form class="add-form" method="post">
						<div class="row">
							<div class="md12">
								<label for="">Email</label>
								<input type="email" name="email" id="email" />
							</div>
							<div class="md6">
								<label for="">First Name</label>
								<input type="text" name="firstName" id="firstName" />
							</div>
							<div class="md6">
								<label for="">Last Name</label>
								<input type="text" name="lastName" id="lastName" />
							</div>
							<div class="md6">
								<label for="">City</label>
								<input type="text" name="city" id="city" />
							</div>
							<div class="md6">
								<label for="">County</label>
								<input type="text" name="county" id="county" />
							</div>
							<div class="md6">
								<label for="">Street</label>
								<input type="text" name="street" id="street" />
							</div>
							<div class="md3">
								<label for="">House Number</label>
								<input type="text" name="house" id="house" />
							</div>
							<div class="md3">
								<label for="">Post Code</label>
								<input type="text" name="postcode" id="postcode" />
							</div>
							<div class="md6">
								<label for="">Phone</label>
								<input type="text" name="phonenumber" id="phonenumber" />
							</div>
							<div class="md6">
								<label for="">Date of Birth</label>
								<input type="date" name="date_of_birth" id="date_of_birth" />
							</div>
						</div>
						<button type="submit" class="submit-btn">Submit</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
