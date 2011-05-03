# from http://madhatted.com/2009/8/12/faster-sites-done-faster
namespace :test do

  desc "Check JavaScript with JSLint"
  task :javascript_lint do
    Dir.chdir(Rails.root) do
      puts `node test/javascripts/lint.js`
    end
  end

end

