<template>
 <div class="row todo-content">
    <div class="col-md-6">
      <div class="todo-list not-done">
        <h1>TODOList</h1>
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Enter content">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" id="button-addon2">Add</button>
          </div>
        </div>
        <hr>
        <ul class="list-unstyled">
          <li class="ui-state-default li-items mt-1">
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <input type="checkbox" aria-label="Radio button for following text input">
                </div>
              </div>
              <input type="text" class="form-control">
              <div class="input-group-append remove-icon">
                <span class="input-group-text">&#10060;</span>
              </div>
            </div>
          </li>
        </ul>
        <hr>
        <div class="todo-footer row">
          <div class="col-md-6">
            <div class="form-check form-check-inline">
              &#9989;
              <label class="form-check-label" for="inlineRadio1">Check all</label>
            </div>
            <div class="form-check form-check-inline">
              &#10062;
              <label class="form-check-label" for="inlineRadio2">UnCheck all</label>
            </div>
          </div>
          <div class="col-md-6 save-all">
            <div class="form-check form-check-inline save-all">
              <button type="button" class="btn btn-success btn-sm">DONE ALL &#10004;</button>
            </div>
            <div class="form-check form-check-inline save-all">
              <button type="button" class="btn btn-dark btn-sm">DEL ALL &#10006;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  
}
</script>

<style scoped>
  .todo-content{
    display: flex;
    justify-content: center;
  }


</style>

