import { Component, OnInit } from '@angular/core';
import { Categorie } from '../model/categorie.model';
import { AppeloffreService } from '../services/appeloffre.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gestioncategories',
  templateUrl: './gestioncategories.component.html',
  styleUrls: ['./gestioncategories.component.css']
})
export class GestioncategoriesComponent implements OnInit {
  showAddCategoryForm = false;
  categoryName = '';
  categoryDescription = '';
  categories: Categorie[] = [];
  editCategoryId: string | null = null;
  searchTerm: string = '';
  constructor(private appelOffreService: AppeloffreService,private toastr:ToastrService) {}

  ngOnInit() {
    this.loadCategories();
  }
  searchCategories(searchTerm: string): void {
    if (searchTerm.length > 0) {
        console.log(`Searching for: ${searchTerm}`);
        this.appelOffreService.searchCategoriesByNomSuperadmin(searchTerm).subscribe({
            next: (categories) => {
                console.log('Categories found:', categories);
                this.categories = categories;
            },
            error: (error) => {
                console.error('Search error:', error);
                this.toastr.error('Error searching categories');
            }
        });
    } else {
        this.loadCategories(); // Reload all categories if search term is cleared
    }
}


  startEdit(category: Categorie) {
    this.editCategoryId = category.id;  // Save the id of the category being edited
    this.categoryName = category.nomcategorie;
    this.categoryDescription = category.description;
    this.showAddCategoryForm = false;  // Optionally hide the add form if it's visible
  }
  toggleAddCategory() {
    this.showAddCategoryForm = !this.showAddCategoryForm;
  }

  loadCategories() {
    this.appelOffreService.getAllCategoriesSuperadmin().subscribe({
      next: (categories) => {
        this.categories = categories.map(category => ({
          ...category,
          appelOffresCount: 0 // Initialize count
        }));
        this.categories.forEach((category, index) => {
          this.appelOffreService.getAppelOffreCountByCategorieSuperadmin(category.id).subscribe(count => {
            this.categories[index].appelOffresCount = count;
          });
        });
      },
      error: (error) => console.error('Error loading categories', error)
    });
  }

  addCategory(name: string, description: string) {
    const newCategory: Partial<Categorie> = { nomcategorie: name, description };
    this.appelOffreService.addCategorySuperadmin(newCategory as Categorie).subscribe({
      next: (category) => {
        this.categories.push({ ...category, appelOffresCount: 0 });
        this.toggleAddCategory(); // Optionally hide the form again
        this.categoryName = '';
        this.categoryDescription = '';
        this.toastr.success('Catégorie creée avec succès');
      },
      error: (error) => console.error("Échec de la création de la catégorie", error)
    });
  }

  updateCategory() {
    const updatedCategory: Partial<Categorie> = { 
      nomcategorie: this.categoryName, 
      description: this.categoryDescription 
    };
    if (this.editCategoryId) {
      this.appelOffreService.updateCategorySuperadmin(this.editCategoryId, updatedCategory as Categorie).subscribe({
        next: (category) => {
          const index = this.categories.findIndex(c => c.id === this.editCategoryId);
          if (index !== -1) {
            this.categories[index] = { ...category, appelOffresCount: this.categories[index].appelOffresCount };
          }
          this.editCategoryId = null;  // Reset edit mode
          this.toastr.success('Catégorie modifiée avec succès');
        },
        error: (error) => console.error('Échec de la modification de la catégorie', error)
      });
    }
  }
  cancelEdit() {
    this.editCategoryId = null;
  }
  deleteCategory(id: string): void {
    if (confirm("Are you sure you want to delete this category?")) {
        this.appelOffreService.deleteCategorySuperadmin(id).subscribe(() => {
            this.toastr.success('Catégorie supprimée avec succès');
            this.loadCategories(); // Reload categories to reflect changes
        }, error => {
            this.toastr.error('Échec de la suppression de la catégorie');
        });
    }
}

  

}
